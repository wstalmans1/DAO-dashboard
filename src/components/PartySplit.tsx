import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return ( 
    <div className="min-h-screen flex flex-col items-center justify-center p-5 bg-gradient-to-british-racing-green text-gray-50">
        404 - Not Found
        <Link to="/" className="p-4 text-blue-500 hover:underline">Go Home</Link>
    </div>
  );
}