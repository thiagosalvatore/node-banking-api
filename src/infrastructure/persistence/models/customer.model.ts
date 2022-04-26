import { Schema, model, Types } from 'mongoose';

interface ICustomer {
    id: Types.ObjectId;
    name: string;
}

const customerSchema = new Schema<ICustomer>({
    name: {
        type: String,
        required: true,
    },
});

const CustomerModel = model<ICustomer>('customer', customerSchema);

export { CustomerModel, ICustomer };
