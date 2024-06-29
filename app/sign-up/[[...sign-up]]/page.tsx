import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="sign-up">
      <SignUp appearance={{
        variables:{
          // fontSize:"100%"
        }
      }} />
    </div>
  );
}
