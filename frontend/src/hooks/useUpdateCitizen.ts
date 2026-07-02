import { useMutation, useQueryClient} from "@tanstack/react-query";
import { patchCitizen } from "../api/citizens";
import type { UpdateCitizenDto } from "../types/citizenType";

export default function useUpdateCitizen(id: string){
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (data: UpdateCitizenDto) => patchCitizen(id, data),

        onSuccess: (updatedCitizen) => {
            queryClient.invalidateQueries({queryKey: ['citizens']})
            queryClient.invalidateQueries({queryKey: ['citizen', updatedCitizen.id]})
        }
    })
}