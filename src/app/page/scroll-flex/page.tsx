import storage from "@/lib/db/storage";
import { updateLenght } from "./_action/updateLenght";

export default async function Page() {
    await storage.init()
    const total = await storage.getItem("angka") || 10;
    const list = Array.from({ length: total }, (_, i) => i);
    return <div style={{
        height: "100vh",
        padding: 20,
        flexDirection: "column",
        // backgroundColor: "gray",
        position: "relative",
        overflow: "hidden",
        gap: 20,
        display: "flex",
    }}>
        <div style={{
            height: 50,
            backgroundColor: "lightblue",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            color: "black",
            gap: 20
        }}>
            <h4>Scroll Flex</h4>
            <div style={{
                display: "flex",
                gap: 20
            }}>
                <form action={updateLenght}>
                    <input name="angka" defaultValue={list.length} type="number" placeholder="masukkan angka" />
                    <button>GENERATE</button>
                </form>
            </div>

        </div>
        <div style={{
            display: "flex",
            flex: 1,
            overflow: "auto",
            flexDirection: "column",
            padding: 20,
            border: "1px solid white",
            position: "relative",
            height: "100%",
            backgroundColor: "lightseagreen",
            marginBottom: 20
        }}>
            <h1 style={{
                marginBottom: 0
            }}>apa kabat</h1>
            {list.map((item) => <div key={item}>{item+" wibu loncat loncat"} </div>)}
        </div>
    </div>
}