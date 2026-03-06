import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { register } from "./service";
import { toast } from "sonner";

const schema = yup.object().shape({
  name: yup.string().required("Name Cannot Be Empty"),
  email: yup
    .string()
    .required("Email Cannot Be Empty")
    .email("Enter Valid Email"),
  password: yup
    .string()
    .min(6, "Password Needs To Be 6 Or More Than 6 Characters")
    .required("Password is required"),
});

const RegisterPage = () => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await register(data);
      console.log(response);
      console.log("resetting");
      form.reset({ name: "", email: "", password: "" });
      toast.success("Account Created Sucessfully");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A0F1E] flex items-center justify-center p-4">
      <div className="flex flex-col gap-3 md:gap-5 w-full md:w-120 bg-[#1A1F2E] p-5 md:p-8 rounded-2xl">
        <div className="flex flex-col gap-2 items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
            <Target className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
          <h1 className="text-xl md:text-[28px] font-medium bg-gradient-to-br from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            DayQuest
          </h1>
          <p className="text-sm md:text-[16px] text-slate-400">
            Start your journey today
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 md:gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-slate-300">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-slate-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email Id" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-slate-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter Your Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              variant="ghost"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 cursor-pointer rounded-lg text-white font-semibold py-2 md:py-3 text-sm md:text-base hover:opacity-90 transition-opacity"
            >
              Create Account
            </Button>
          </form>
        </Form>

        <p className="text-sm text-slate-400 flex items-center justify-center gap-1">
          Already Have Account?
          <span className="text-sm text-purple-400 cursor-pointer hover:text-purple-300">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
