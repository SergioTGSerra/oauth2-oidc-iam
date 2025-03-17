import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
 
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("amason-provider", { redirectTo: "/dashboard" })
      }}
    >
      <Button className="text-black hover:bg-black hover:text-white" variant="outline" type="submit">Go to the application</Button>
    </form>
  )
}