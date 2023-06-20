import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConverstation = () => {
  const params = useParams();
  const conversationId = useMemo(() => {
    if (!params?.conversationId) return "";
    return params?.conversationId;
  }, [params?.conversationId]);

  const isOpen = useMemo(() => !conversationId, [conversationId]);

  return useMemo(
    () => ({ conversationId, isOpen: isOpen }),
    [conversationId, isOpen]
  );
};
export default useConverstation;
