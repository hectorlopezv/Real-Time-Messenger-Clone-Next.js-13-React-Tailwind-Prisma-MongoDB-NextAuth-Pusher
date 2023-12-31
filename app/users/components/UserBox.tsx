"use client";
import Avatar from "@/app/components/avatar/Avatar";
import LoadingModal from "@/app/components/modal/LoadingModal";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  data: User;
};

export default function UserBox({ data }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    setLoading(true);
    axios
      .post(
        "/api/conversations",
        {
          userId: data.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data);
        router.push(`/conversations/${data.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong, please try again later");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, router]);
  return (
    <>
      {loading && <LoadingModal />}
      <div
        className="w-full relative flex items-center space-x-3 bg-white p-3
  hover:bg-neutral-100 rounded-lg transition cursor-pointer"
        onClick={handleClick}
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
