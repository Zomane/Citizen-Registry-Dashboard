import { useQuery} from "@tanstack/react-query";
import { getCitizens } from "../api/citizens";

export default function useCitizens(){
    return useQuery({
        queryKey: ['citizens'],
        queryFn: getCitizens,
        staleTime: 60000,
        retry: 3,
    })
}

