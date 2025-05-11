import { Link } from "react-router";
import Button from "view/components/Button";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center flex-1 gap-6">
      <h1 className="text-5xl font-bold">404 Not Found!</h1>
      <p className="text-lg text-muted">
        Let's get started by creating a new translation.
      </p>
      <Link to="/translate">
        <Button className="bg-primary-500 hover:bg-primary-700">
          Start a new translation
        </Button>
      </Link>
    </main>
  );
}
