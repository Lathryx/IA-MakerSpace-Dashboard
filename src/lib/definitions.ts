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

export type Item = {
    item_id: string; 
    name: string; 
    quantity: number; 
    consumable: boolean; 
}; 

export type Student = {
    student_id: string; 
    name: string; 
    status: 'active' | 'inactive'; 
    dateActivated: string; 
    dateDeactivated: string; 
}; 

export type Recorder = {
    recorder_id: string; 
    name: string; 
    status: 'active' | 'inactive'; 
}; 