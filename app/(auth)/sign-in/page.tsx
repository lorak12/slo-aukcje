import { signIn } from "@/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

function Page() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Zaloguj się aby móc uczestniczyć w aukcji.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src="/logo.png" alt="Logo image" width={400} height={400} />
          <div className="grid gap-4">
            <Button variant="outline" type="submit" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Made with <code>@next/auth@5.0.0</code>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

export default Page;
