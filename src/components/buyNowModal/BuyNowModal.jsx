import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction , onClose }) => {
    const [open, setOpen] = useState(false);

    // Toggle modal open/close
    const handleOpen = () => setOpen(prevOpen => !prevOpen);

    // Handle changes in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddressInfo(prev => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Button
                type="button"
                onClick={handleOpen}
                className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border 
                border-transparent dark:border-gray-700 hover:border-pink-500 hover:text-pink-700 hover:bg-pink-100 rounded-xl"
            >
                Buy now
            </Button>
            
            <Dialog open={open} handler={handleOpen} className="bg-pink-50">
                <DialogBody>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={addressInfo.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                        />
                        <input
                            type="text"
                            name="address"
                            value={addressInfo.address}
                            onChange={handleChange}
                            placeholder="Enter your address"
                            className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                        />
                        <input
                            type="number"
                            name="pincode"
                            value={addressInfo.pincode}
                            onChange={handleChange}
                            placeholder="Enter your pincode"
                            className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                        />
                        <input
                            type="text"
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={handleChange}
                            placeholder="Enter your mobile number"
                            className="bg-pink-50 border border-pink-200 px-2 py-2 w-full rounded-md outline-none text-pink-600 placeholder-pink-300"
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        type="button"
                        onClick={() => {
                            handleOpen(); // Close the modal
                            buyNowFunction(); // Call the buyNowFunction
                        }}
                        className="w-full px-4 py-3 text-center text-gray-100 bg-pink-600 border border-transparent dark:border-gray-700 rounded-lg"
                    >
                        Buy now
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default BuyNowModal;
