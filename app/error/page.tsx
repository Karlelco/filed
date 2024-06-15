'use client';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ErrorPage() {
  return (
    <div>
      <Button onClick={() => window.location.reload()}>Reload</Button>
      <Button>
        <Link href="/pages/login">Back to Login</Link>
      </Button>
    </div>
  );
}
