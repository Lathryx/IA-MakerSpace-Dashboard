export type User = {
    user_id: string; 
    name: string; 
    password: string; 
}; 

export type Order = {
    order_id: string; 
    recorder_id: string; 
    student_id: string; 
    item_id: string; 
    quantity: number; 
    status: 'outstanding' | 'returned'; 
    date_out: string; 
    date_returned: string; 
}; 

export type OrderTable = {
    order_id: string; 
    date_out: string; 
    item_name: string; 
    quantity: number; 
    student_name: string; 
    status: 'outstanding' | 'returned'; 
    recorder_name: string; 
    date_returned: string; 
}; 

export type Item = {
    item_id: string; 
    name: string; 
    quantity: number; 
    consumable: boolean; 
}; 

export type ItemField = {
    item_id: string; 
    name: string; 
}

export type Student = {
    student_id: string; 
    name: string; 
    status: 'active' | 'inactive'; 
    dateActivated: string; 
    dateDeactivated: string; 
}; 

export type StudentField = {
    student_id: string; 
    name: string; 
}; 

export type Recorder = {
    recorder_id: string; 
    name: string; 
    status: 'active' | 'inactive'; 
}; 

export type RecorderField = {
    recorder_id: string; 
    name: string; 
}; 