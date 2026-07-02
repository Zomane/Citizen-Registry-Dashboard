import { useQuery} from "@tanstack/react-query";
import { getCitizenById } from "../api/citizens";

export default function useCitizenById(id: string){
    return useQuery({
        queryKey: ['citizen', id],
        queryFn: () => getCitizenById(id),
        enabled: !!id,
        retry: 3,
        staleTime: 60000
    })
}