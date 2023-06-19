import { useParams } from "next/navigation";
import { useMemo } from "react";

const useConverstation = () => {
  const params = useParams();
  const converstationId = useMemo(() => {
    if (!params?.converstationId) return "";
    return params?.converstationId;
  }, [params?.converstationId]);

  const isOpen = useMemo(() => !converstationId, [converstationId]);

  return useMemo(
    () => ({ converstationId, isOpen: false }),
    [converstationId, isOpen]
  );
};
export default useConverstation;
