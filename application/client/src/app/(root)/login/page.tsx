"use client";
import { toast } from "react-toastify";
import { FormEvent, useState } from "react";
import { Button1 } from "@/components/Elements/buttons";
import Input from "@/components/Elements/input";
import MailSvg from "@/svg/mail";
import { fetchJson } from "@/utils/fetch";
import { useRouter } from 'next/navigation';
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/store/slices/userSlice";

export default function Login() {

  const [form, setForm] = useState<
    { username: string; password: string }
  >({
    username: "",
    password: "",
  });
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onLogin = async () => {
    setLoading(true);
    try {
      const res = await fetchJson(`/users?username=${form.username}`, {},{},"api1");
      if (res.status >= 200 && res.status < 300) {
        if (res.json[0].username === form.username) {
          toast.success("Login successful");
          dispatch(setUser(res.json[0]))
          localStorage.setItem("userName",res.json[0].username)
          router.push(`/${res.json[0].type}`)
        }
        else {
          toast.error("Username or password is incorrect");
        }
      } else {
        toast.error(res.message);
      }
    }
    catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.username === "" || form.password === "") {
      setIsEmpty(true);
      setSubmitted(true);
      document.getElementById("content")!.classList.add("animate-shake");
      setTimeout(() => {
        document.getElementById("content")!.classList.remove("animate-shake");
      }, 900);
    } else {
      document.getElementById("content")!.classList.remove("animate-shake");
      setIsEmpty(false);
      setSubmitted(false);
      onLogin();
    }
  };

  return (
    <main
      id="content"
      role="main"
      className="max-[490px]:p-6 absolute z-10 flex justify-center items-center w-full h-full"
    >
      <div className="mt-1 bg-white rounded-[40px] shadow-[0_0_10px_#c4c4c4] opacity-90">
        <div className="p-4 sm:p-7 mx-3  opacity-8">
          <div className="text-center mt-6">
            <h1 className=" text-2xl  text-left font-bold text-ph_blue ">
              Welcome back!
            </h1>
            <p className="text-left text-ph_blue text-xs">
              Welcome Login Server Please enter your details.
            </p>
          </div>
          <div className="mt-6">
            <p
              data-testid="error-message"
              className={`${!isEmpty ? "hidden" : "visible"
                } " mb-2 italic text-ph_tomatored text-xs "`}
            >
              Please fill out all required fields.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-y-4">
                <div className="relative">
                  <Input
                    label="UserName"
                    value={form.username}
                    labelColor="ph_blue"
                    color={form.username === "" ? "ph_graywhite" : "ph_blue_light"}
                    required={submitted && form.username === "" ? true : false}
                    htmlFor="userName"
                    type="text"
                    id="userName"
                    name="userName"
                    placeholder="example@example.com"
                    onChange={(e) => {
                      setForm({ ...form, username: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="grid gap-y-4 mt-6">
                <Input
                  label="Password"
                  value={form.password}
                  labelColor="ph_blue"
                  required={submitted && form.password === "" ? true : false}
                  color={form.password === "" ? "ph_graywhite" : "ph_blue_light"}
                  htmlFor="password"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="**********"
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                  }}
                />
                <a
                  href="/signup"
                  className="text-right underline text-ph_blue font-medium text-xs mt-[-4px] mb-3"
                >
                  Sign Up
                </a>
                <Button1 type="submit" text="Sign in" loading={loading} />
              </div>
            </form>
            <div className="mt-7 flex justify-center items-center text-center ">
              <p className="pr-3.5 inline-flex items-center gap-x-2 text-sm text-gray-600">
                <MailSvg /> help@tracker.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
