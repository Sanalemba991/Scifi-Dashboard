import Dashboard from "./Dashboard";
import { employeeData } from "../data/employeeData";

export default function Page() {
  return <Dashboard employeeData={employeeData} />;
}
