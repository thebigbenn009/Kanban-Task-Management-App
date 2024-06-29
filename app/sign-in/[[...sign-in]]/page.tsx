import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="sign-up">
      <SignIn />
    </div>
  );
}
