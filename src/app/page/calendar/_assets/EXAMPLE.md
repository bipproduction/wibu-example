# EXAMPLE CALENDAR

### INSTALL
`yarn add react-big-calendar`

```tsx
"use client";

import { Stack } from "@mantine/core";
import { Calendar, momentLocalizer, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/sass/styles.scss";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import MarkdonwPreview from "@uiw/react-markdown-preview";
const localizer = momentLocalizer(moment);

export function CalendarPage({ data }: { data: string }) {
  const [date, setDate] = useState(new Date());
  const [view, setView] = useState<View>("month");
  return (
    <Stack bg={"white"} c={"dark"} color="dark" p={"md"}>
      <Calendar
        localizer={localizer}
        events={[
          {
            title: "Makan siang",
            start: new Date("2024-08-03"),
            end: new Date("2024-08-05"),
          },
          {
            title: "rapat antar divisi",
            start: new Date("2024-08-01"),
            end: new Date("2024-08-09"),
          },
          {
            title: "Beli gorengan",
            start: new Date("2024-08-20"),
            end: new Date("2024-08-25"),
          },
          {
            title: "Ngopi Diwarung Mbak Rara",
            start: new Date("2024-08-10"),
            end: new Date("2024-08-12"),
          },
          {
            title: "Tidur siang",
            start: new Date("2024-08-25"),
            end: new Date("2024-08-30"),
          },
          {
            title: "Modol",
            start: new Date("2024-08-30 08:00:00"),
            end: new Date("2024-08-30 16:00:00"),
          },
          {
            title: "Cari Jangkrik",
            start: new Date("2024-08-30 09:00:00"),
            end: new Date("2024-08-30 14:00:00"),
          },
        ]}
        onNavigate={(date, view, action) => {
          console.log(date, view, action);

          if (action === "PREV") {
            setDate(moment(date).subtract(1, "month").toDate());
          }

          if (action === "NEXT") {
            setDate(moment(date).add(1, "month").toDate());
          }

          if (action === "TODAY") {
            setDate(new Date());
          }
        }}
        onSelectEvent={(event) => {
          console.log(event, "event");
        }}
        onShowMore={(date) => {
          console.log(date, "show more");
        }}
        onView={(view) => {
          console.log(view, "on view");
          setView(view);
        }}
        onDrillDown={(date) => {
          console.log(date, "on drill down");
        }}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        // defaultDate={date}
        date={date}
        view={view}
      />

      <MarkdonwPreview source={data} style={{ padding: 16 }} />
    </Stack>
  );
}
```
