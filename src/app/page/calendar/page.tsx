import { CalendarPage } from "./_ui/CalendarPage";
import fs from 'fs'
import path from "path";
const root = path.join(process.cwd(), './src/app/page/calendar/_assets');
export default function Page() {
    const example = fs.readFileSync(root + '/EXAMPLE.md', 'utf-8');
    
    return <CalendarPage data={example} />
}