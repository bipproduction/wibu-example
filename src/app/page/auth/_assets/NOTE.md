# AUTH

auth menggunakan middleware untuk mendistribusikan alur autentication

app/middleware.ts

```ts
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/auth/_lib/session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/dashboard", "/auth/logout"];
const publicRoutes = ["/auth/login", "/auth/signup", "/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the session from the cookie
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // 6. Redirect to /dashboard if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

```

app/auth/_lib/session.ts

```ts
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, expiresAt });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export function deleteSession() {
  cookies().delete("session");
}

```

app/auth/login/page.tsx

```tsx
'use client'
import { Button, Container, Flex, Stack, Text, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";

const defauktForm: any = {
    email: null,
    password: null
}
export default function Page() {
    const [loginForm, setLoginForm] = useState(defauktForm)
    const [loading, setLoading] = useState(false)

    async function onSubmit() {

        setLoading(true)
        if (!loginForm.email || !loginForm.password) {
            setLoading(false)
            return alert("Please fill in all fields")
        }

        const res = await fetch('/auth/login/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginForm)
        })


        setLoading(false)
        if (!res.ok) {
            const text = await res.text()
            return alert(text)
        }

    }
    return (
        <Stack h={'100vh'} w={'100vw'}>
            <Container maw={400} pos={"relative"} top={"10%"}>
                <Stack>
                    <Title order={3}>Login</Title>
                    <TextInput placeholder="Email" defaultValue={loginForm.email} onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} />
                    <TextInput type="password" placeholder="Password" defaultValue={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} />
                    <Button loading={loading} onClick={onSubmit}>Login</Button>
                    <Flex align={'center'}>
                        <Text>Dont have an account?</Text>
                        <Button  size="compact-xs" variant="transparent" component={Link} href={'/auth/signup'}>Signup</Button>
                    </Flex>
                </Stack>
            </Container>
        </Stack>
    )
}
```
app/auth/login/api/login/route.ts

```ts
import prisma from "@/app/auth/_lib/prisma";
import { createSession } from "@/app/auth/_lib/session";
import bcrypt from "bcrypt";
export async function POST(req: Request) {
  const { email, password } = (await req.json()) as any;
  const hashPassword = await bcrypt.hash(password, 10);

  if (!email || !password) {
    return new Response("Please fill in all fields", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    return new Response("User not found", { status: 400 });
  }

  const isValidPassword = await bcrypt.compare(hashPassword, user.password);

  if (!isValidPassword) {
    return new Response("Invalid password", { status: 400 });
  }


  await createSession(user.id);

  return new Response("Success", { status: 200 });
}

```

app/auth/logout/page.tsx

```tsx
'use client'
import { Button, Container, Stack, Title } from "@mantine/core";
import { useState } from "react";

export default function Page() {
    const [loading, setLoading] = useState(false)
    async function onLogout() {
        setLoading(true)
        const res = await fetch('/auth/logout/api/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })

        setLoading(false)

        if (res.ok) {
            window.location.href = '/auth/login'
        }
    }
    return <Stack h={'100vh'} w={'100vw'}>
        <Container maw={400}>
            <Stack>
                <Title order={3}>Logout</Title>
                <Button loading={loading} onClick={onLogout}>Logout</Button>
            </Stack>
        </Container>
    </Stack>
}
```

app/auth/logout/api/logout/route.ts

```ts
import { cookies } from "next/headers";

export async function POST() {
  cookies().delete("session");
  return new Response("success");
}

```

app/auth/signup/_ui/FormSignup.tsx

```tsx
'use client'
import { Button, Container, Flex, Group, PasswordInput, Stack, Text, TextInput, Title } from "@mantine/core"
import Link from "next/link"
import { useState } from "react"

const defaultForm: any = {
    name: null,
    email: null,
    password: null
}
export function FormSignup() {
    const [form, setForm] = useState(defaultForm)
    const [loading, setLoading] = useState(false)

    async function onSubmit() {
        setLoading(true)
        if (!form.name || !form.email || !form.password) {
            setLoading(false)
            return alert("Please fill in all fields")
        }

        const res = await fetch('/auth/signup/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })

        setLoading(false)
        if (!res.ok) {
            const text = await res.text()
            return alert(text)
        }

        window.location.href = '/auth/login'
    }
    return <Stack h={'100vh'} w={'100vw'}  >
        <Container maw={400} pos={"relative"} top={"10%"} >
            <Stack>
                <Title order={3}>Signup</Title>
                <TextInput placeholder="Name" defaultValue={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <TextInput type="email" placeholder="Email" defaultValue={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <PasswordInput placeholder="Password" defaultValue={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <Group justify="flex-end">
                    <Button loading={loading} onClick={onSubmit}>Submit</Button>
                </Group>
                <Flex>
                    <Text>Already have an account?</Text>
                    <Button  size="compact-xs" variant="transparent" component={Link} href={'/auth/login'}>Login</Button>
                </Flex>
            </Stack>
        </Container>
    </Stack>
}
```

app/auth/signup/api/signup/route.ts

```ts
import { signup } from "../../_action/signup";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return new Response("Please fill in all fields", { status: 400 });
  }

  const sup = await signup({ name, email, password });

  if (sup.errors) {
    console.log(sup.errors);
    return new Response(JSON.stringify(sup.errors), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ name, email, password }), {
    status: 200,
  });
}

```

app/auth/signup/_action/signup.ts

```ts
import { SignupFormSchema } from "@/app/auth/_lib/definitions";
import prisma from "@/app/auth/_lib/prisma";
import { createSession } from "@/app/auth/_lib/session";
import bcrypt from "bcrypt";

export async function signup(fomData: any) {
  const { name, email, password } = fomData;

  const validatedFields = SignupFormSchema.safeParse({
    name,
    email,
    password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.formErrors.fieldErrors,
      message: "An error occurred while creating your account.",
    };
  }
  const hashedPassword = await bcrypt.hash(password as string, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      erros: "An error occurred while creating your account.",
      message: "An error occurred while creating your account.",
    };
  }

  await createSession(user.id);
  return { user };
}

```