export type CitizenStatus = 'active' | 'pending' | 'archived'
export type Gender = 'male' | 'female'

export type DocumentVerificationStatus = 'verified' | 'pending' | 'rejected'

export type CitizenDocument = {
    id: string
    type: string
    series?: string
    number: string
    issuedAt?: string
    issuedBy?: string
    verificationStatus: DocumentVerificationStatus
}

export type FamilyMember = {
    id: string
    fullName: string
    relation: string
    birthDate: string
    livesTogether: boolean
    phone?: string
}

export type EducationInfo = {
    level: string
    institution: string
    specialty: string
}

export type EmploymentInfo = {
    status: string
    company?: string
    position?: string
    incomeCategory: string
}

export type EmploymentHistoryItem = {
    id: string
    company: string
    position: string
    period: string
    status: string
}

export type Citizen = {
    id: string
    fullName: string
    birthDate: string
    gender: Gender
    phone: string
    email: string
    city: string
    address: string
    socialCategory: string
    status: CitizenStatus
    registrationDate: string

    snils: string
    inn: string

    documents: CitizenDocument[]
    family: FamilyMember[]
    education: EducationInfo
    employment: EmploymentInfo
    employmentHistory: EmploymentHistoryItem[]
}

export type UpdateCitizenDto = Partial<
    Pick<Citizen,
        | 'fullName'
        | 'birthDate'
        | 'gender'
        | 'phone'
        | 'email'
        | 'city'
        | 'address'
        | 'socialCategory'
        | 'status'
        | 'snils'
        | 'inn'
    >
>

export type Filters = {
    gender: Gender | ''
    city: string
    socialCategory: string
    status: CitizenStatus | ''
}