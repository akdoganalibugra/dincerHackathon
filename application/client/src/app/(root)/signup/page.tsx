"use client";
import { toast } from "react-toastify";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/Elements/buttons";
import Input from "@/components/Elements/input";
import MailSvg from "@/svg/mail";
import { fetchJson } from "@/utils/fetch";
import Dropdown from "@/components/Elements/dropdown";
import { useRouter } from 'next/navigation';
import uuid from 'react-uuid';

export default function Signup() {

  const [form, setForm] = useState<
    { username: string; password: string, type: string }
  >({
    username: "",
    password: "",
    type: "sender",
  });
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const options = useMemo(() => ["sender", "receiver", "shipper"], []);

  const onLogin = async () => {
    setLoading(true);
    try {
      const res = await fetchJson(`/users`, {
        method: "POST",
        body: JSON.stringify({
          ...form,
          enabled: true,
          id: uuid(),
        }),
      }, {}, "api1"
      );
      if (res.status >= 200 && res.status < 300) {
        toast.success(res.message);
        window.location.href = "/login";
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

  const handleDropdownChange = (selectedValue: string) => {
    setForm({ ...form, type: selectedValue });
  }

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
              Welcome Signup Server Please enter your details.
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
                <div className="relative">
                  <Dropdown
                    options={options}
                    value={form.type}
                    onChange={handleDropdownChange}
                    label="User Type"
                    id="dropdown"
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
                  href="/login"
                  className="text-right underline text-ph_blue font-medium text-xs mt-[-4px] mb-3"
                >
                  Login
                </a>
                <Button type="submit" text="Sign up" loading={loading} />
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
