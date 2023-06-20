import Button from "@/app/components/button/Button";
import Input from "@/app/components/inputs/Input";
import Modal from "@/app/components/modal/Modal";
import Select from "@/app/components/select/Select";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { userInfo } from "os";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

type Props = {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
};

export default function GroupChatModal({ onClose, isOpen, users }: Props) {
  const router = useRouter();
  const [isloading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });
  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsloading(true);

    axios
      .post("/api/conversations", {
        ...data,
        isGroup: true,
      })
      .then((res) => {
        router.refresh();
        onClose();
        toast.success("Group created successfully");
      })
      .finally(() => {
        setIsloading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong, please try again later");
      });
  };
  return (
    <Modal isOpen={isOpen!} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Create a group chat with more than 2 people
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                label="Name"
                id="name"
                disabled={isloading}
                required
                errors={errors}
              />
              <Select
                disabled={isloading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name!,
                }))}
                onChange={(value) =>
                  setValue("members", value, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            disabled={isloading}
            type="button"
            secondary
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button disabled={isloading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
}
