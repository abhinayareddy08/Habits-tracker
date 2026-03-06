import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { login } from "./service";
import { toast } from "sonner";
import { Target } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Enter Valid Email")
    .required("Email Cannot Be Empty"),
  password: yup.string().required("Password Is Required"),
});
export const LoginPage = () => {
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    try {
      const response = await login(data);
      console.log(response);
      form.reset({ email: "", password: "" });
      toast.success("You Are Sucessfully Logged In");
    } catch (error: any) {
      toast.error(error?.response?.data?.message ?? "Something went wrong!");
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#0A0F1E] flex items-center justify-center p-4">
      <div className="flex flex-col gap-3 md:gap-5 w-full md:w-120 bg-[#1A1F2E] p-5 md:p-8 rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
            <Target className="w-6 h-6 md:w-8 md:h-8 text-white flex" />
          </div>
          <h1 className="text-xl md:text-[28px] font-medium bg-gradient-to-br from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            DayQuest
          </h1>
          <p className="text-sm md:text-[16px] text-slate-400">
            Login to continue your journey
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-3 md:gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-slate-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            ></FormField>
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs md:text-sm font-medium text-slate-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Password" {...field} />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            ></FormField>{" "}
            <Button
              type="submit"
              variant="ghost"
              className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 cursor-pointer rounded-lg text-white font-semibold py-2 md:py-3 text-sm md:text-base hover:opacity-90 transition-opacity"
            >
              Login
            </Button>
          </form>
        </Form>

        <p className="text-sm text-slate-400 flex items-center justify-center gap-1">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-sm text-purple-400 cursor-pointer hover:text-purple-300"
          >
            Register Here
          </Link>
        </p>
      </div>
    </div>
  );
};
