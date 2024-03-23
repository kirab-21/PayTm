import { Warning } from "../components/Warning";
import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { InputBox } from '../components/InputBox';
import { SubHeading } from '../components/SubHeading';

export const Signin = () => {
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Header label={"Sign in"}/>
                <SubHeading label={"Enter your credentials to access your account"}/>
                <InputBox placeholder="prabhu@gmail.com" label={"Email"}/>
                <InputBox placeholder="12345678" label={"Password"}/>
                <div className="pt-4">
                    <Button label={"Sign in"}/>
                </div>
                <Warning label={"Dont have an account"} buttonText={"Sign up"} to={"/signup"}/>
            </div>
        </div>
    </div>
}