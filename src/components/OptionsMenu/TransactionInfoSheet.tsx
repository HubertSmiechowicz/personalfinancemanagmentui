import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Info } from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {useEffect, useState} from "react";
import axios from "axios";

function TransactionInfoSheet(props: { api: string, transactionId: number }) {

    const [date, setDate] = useState<string>("Date");
    const [name, setName] = useState<string>("Name");
    const [billName, setBillName] = useState<string>("Bill Name");
    const [amount, setAmount] = useState<number>(0);
    const [status, setStatus] = useState<string>("Status");
    const [categoryName, setCategoryName] = useState<string>("Category Name");

    const getTransaction = () => {
        axios.get(`${props.api}/single?id=${props.transactionId}`)
            .then((result) => {
                setDate(result.data.date);
                setName(result.data.name);
                setBillName(result.data.billName);
                setAmount(result.data.amount);
                setStatus(result.data.status)
                setCategoryName(result.data.categoryName);
            })
    }

    return (
            <Sheet>
                <SheetTrigger className="w-full">
                    <Button className="text-slate-50 hover:bg-slate-700 w-full flex justify-start" onClick={getTransaction}>
                        <Info className="mr-2 h-4 w-4"/>
                        <span>details</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side={"bottom"} className="bg-slate-900 text-slate-50">
                    <SheetHeader className="pb-5">
                        <SheetTitle className="text-slate-50">Transaction details</SheetTitle>
                        <SheetDescription>
                            You can find details related to this transaction here
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid grid-cols-2 justify-center items-center gap-4">
                        <div>
                            <p className="pb-2">Date:  {date}</p>
                            <p className="pb-2">Name:  {name}</p>
                            <p className="pb-2">Bill:  {billName}</p>
                        </div>
                        <div>
                            <p className="pb-2">Amount:  {amount}</p>
                            <p className="pb-2">Status:  {status}</p>
                            <p className="pb-2">Category:  {categoryName}</p>
                        </div>
                    </div>
                    <SheetFooter>
                        <SheetClose />
                    </SheetFooter>
                </SheetContent>
            </Sheet>
    )
}

export default TransactionInfoSheet;