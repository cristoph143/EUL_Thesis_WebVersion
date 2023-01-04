export interface Account {
    // school_id,role_roleID,departmentID,first_name,last_name,email,password,approved
    school_id: string;
    role_roleID: number;
    departmentID: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    approve: number;
}

export const AccountColumns = [
    {
        key: 'SchoolID',
        type: 'text',
        label: 'School ID',
    },
    {
        key: 'FirstName',
        type: 'text',
        label: 'First Name',
    },
    {
        key: 'LastName',
        type: 'text',
        label: 'Last Name',
    },
    {
        key: 'Email',
        type: 'text',
        label: 'Email',
    },
    {
        key: 'Role',
        type: 'text',
        label: 'Role',
    },
    {
        key: 'Department',
        type: 'text',
        label: 'Department',
    },
    {
        key: 'Approve',
        type: 'text',
        label: 'Approve',
    },
    {
        key: 'isEdit',
        type: 'isEdit',
        label: '',
    }
]
