import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

function Page() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut({
          redirectTo: "/",
        });
      }}
    >
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Logout</CardTitle>
          <CardDescription>
            Dziękujemy za uczestnictwo w aukcji.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Image src="/logo.png" alt="Logo image" width={400} height={400} />
          <div className="grid gap-4">
            <Button variant="outline" type="submit" className="w-full">
              Wyloguj się
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
