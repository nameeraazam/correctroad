/*'use client'

import * as React from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function CheckoutDescription() {
  return (
    <div className="container mx-auto px-4 py-5 sm:px-8 md:px-12 lg:px-16 mt-16 sm:mt-16 md:mt-20 lg:mt-32 ">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold mb-6">Billing details</h2>
          <form className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input id="companyName" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country / Region</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Sri Lanka" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sl">Sri Lanka</SelectItem>
                  <SelectItem value="in">India</SelectItem>
                  <SelectItem value="pk">Pakistan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="street">Street address</Label>
              <Input id="street" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">Town / City</Label>
              <Input id="city" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="province">Province</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Western Province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="western">Western Province</SelectItem>
                  <SelectItem value="central">Central Province</SelectItem>
                  <SelectItem value="southern">Southern Province</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="zip">ZIP code</Label>
              <Input id="zip" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" type="email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional">Additional Information</Label>
              <Textarea id="additional" className="min-h-[100px]" />
            </div>
          </form>
        </div>

        <div className="lg:pl-8">
          <div className="rounded-lg border p-6">
            <h2 className="text-xl font-medium mb-6">Product</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>Rs. 250,000.00</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span className="text-[#FFA500]">Rs. 250,000.00</span>
              </div>

              <RadioGroup defaultValue="bank" className="mt-8 space-y-4">
                <div className="flex items-start space-x-3">
                  <RadioGroupItem value="bank" id="bank" className="mt-1" />
                  <div className="space-y-2">
                    <Label htmlFor="bank" className="font-medium">Direct Bank Transfer</Label>
                    <p className="text-sm text-muted-foreground">
                      Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="font-medium">Cash On Delivery</Label>
                </div>
              </RadioGroup>

              <div className="mt-6 text-sm text-muted-foreground">
                Your personal data will be used to support your experience throughout this website, to manage access to your account and for other purposes described in our{" "}
                <a href="#" className="underline">privacy policy</a>.
              </div>

              <Button className="w-full mt-6">
                Place order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}*/

"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export default function Checkout() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    city: "",
    province: "",
    zip: "",
    additionalInfo: "",
    orderId: "",
  });

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
    setCartItems(cart);
    calculateTotal(cart);
  }, []);

  const calculateTotal = (cart: CartItem[]) => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalAmount(total);
  };

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const orderId = `ORD-${Date.now()}`; // Auto-generated Order ID

    const details = {
      firstName: formData.get("first-name") as string,
      lastName: formData.get("last-name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      country: formData.get("country-region") as string,
      address: formData.get("street-address") as string,
      city: formData.get("town-city") as string,
      province: formData.get("province") as string,
      zip: formData.get("zip-code") as string,
      additionalInfo: formData.get("additional-information") as string,
      orderId,
    };

    setOrderDetails(details);
    setShowModal(true); // Open Modal
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div>
      <div className="flex">
        <div className="max-w-[1242px] mx-auto my-10 flex flex-col lg:flex-row">
          {/* Billing Details Section */}
          <div className="md:w-[608px] w-auto">
            <div className="flex flex-col gap-8 py-10 px-10">
              <h1 className="font-semibold text-4xl/[54px] font-poppins">
                Billing details
              </h1>
              <form className="space-y-8" onSubmit={handlePlaceOrder}>
                <div className="flex gap-5">
                  <div className="w-[212px] h-[121px] flex flex-col justify-between">
                    <label
                      htmlFor="first-name"
                      className="font-medium font-poppins text-base"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      id="first-name"
                      name="first-name"
                      className="sm:w-[212px] w-full sm:h-[75px] h-[60px] border placeholder:text-[#9F9F9F] border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4"
                    />
                  </div>
                  <div className="w-[212px] h-[121px] flex flex-col justify-between">
                    <label
                      htmlFor="last-name"
                      className="font-medium font-poppins text-base"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      id="last-name"
                      name="last-name"
                      className="sm:w-[212px] w-full sm:h-[75px] h-[60px] border placeholder:text-[#9F9F9F] border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4"
                    />
                  </div>
                </div>

                <div className="h-[121px] flex flex-col justify-between">
                  <label
                    htmlFor="company-name"
                    className="font-medium font-poppins text-base"
                  >
                    Company Name (Optional)
                  </label>
                  <input
                    type="text"
                    id="company-name"
                    name="company-name"
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border placeholder:text-[#9F9F9F] border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4"
                  />
                </div>

                <div className="h-[121px] flex flex-col justify-between">
                  <label
                    htmlFor="country-region"
                    className="font-medium font-poppins text-base"
                  >
                    Country / Region
                  </label>
                  <select
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border border-[#9F9F9F] rounded-[10px] px-5 font-poppins text-[#9F9F9F] text-base"
                    id="country-region"
                    name="country-region"
                    required
                  >
                    <option value="australia">Australia</option>
                    <option value="bangladesh">Bangladesh</option>
                    <option value="bhutan">Bhutan</option>
                    <option value="canada">Canada</option>
                    <option value="china">China</option>
                    <option value="india">India</option>
                    <option value="japan">Japan</option>
                    <option value="maldives">Maldives</option>
                    <option value="nepal">Nepal</option>
                    <option value="pakistan">Pakistan</option>
                    <option value="srilanka">Sri Lanka</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                  </select>
                </div>

                <div className="h-[121px] flex flex-col justify-between">
                  <label
                    htmlFor="street-address"
                    className="font-medium font-poppins text-base"
                  >
                    Street address
                  </label>
                  <input
                    type="text"
                    id="street-address"
                    name="street-address"
                    required
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border placeholder:text-[#9F9F9F] border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4"
                  />
                </div>

                <div className="h-[121px] flex flex-col justify-between">
                  <label
                    htmlFor="town-city"
                    className="font-medium font-poppins text-base"
                  >
                    Town / City
                  </label>
                  <input
                    required
                    type="text"
                    id="town-city"
                    name="town-city"
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border placeholder:text-[#9F9F9F] border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4"
                  />
                </div>

                <div className="h-[121px] flex flex-col justify-between">
                  <label
                    htmlFor="country-region"
                    className="font-medium font-poppins text-base"
                  >
                    Province
                  </label>
                  <select
                    required
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border border-[#9F9F9F] rounded-[10px] px-5 font-poppins text-[#9F9F9F] text-base"
                    id="country-region"
                    name="country-region"
                  >
                    <option value="western">Western Province</option>
                    <option value="eastern">Eastern Province</option>
                    <option value="southern">Southern Province</option>
                    <option value="northern">Northern Province</option>
                    <option value="central">Central Province</option>
                    <option value="north_western">North Western Province</option>
                    <option value="north_central">North Central Province</option>
                  </select>
                </div>

                <div className="h-[121px] flex flex-col justify-between">
                  <label
                    htmlFor="zip-code"
                    className="font-medium font-poppins text-base"
                  >
                    ZIP code
                  </label>
                  <input
                    type="text"
                    id="zip-code"
                    name="zip-code"
                    required
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border placeholder:text-[#9F9F9F] border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4"
                  />
                </div>

                <div className="h-[121px] flex flex-col justify-between">
                  <label
                    htmlFor="phone"
                    className="font-medium font-poppins text-base"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    required
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border placeholder:text-[#9F9F9F] border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4"
                  />
                </div>

                <div className="h-[121px] flex flex-col justify-between">
                  <label
                    htmlFor="email"
                    className="font-medium font-poppins text-base"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border placeholder:text-[#9F9F9F] border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4"
                  />
                </div>

                <div className="h-[121px] flex flex-col justify-between pt-7">
                  <textarea
                    className="sm:w-[453px] w-full sm:h-[75px] h-[60px] border border-[#9F9F9F] rounded-[10px] font-poppins text-base px-4 text-[#9F9F9F] resize-none md:py-6 py-4"
                    id="additional-information"
                    name="additional-information"
                    placeholder="Additional information"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="font-poppins font-normal text-xl/[30px] sm:w-[318px] w-52 h-16 rounded-[15px] hover:bg-slate-50 mx-auto mt-6 border border-black"
                >
                  Place order
                </button>
              </form>
            </div>
          </div>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg w-[500px]">
              <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
              <div>
                <strong>Order ID:</strong> {orderDetails.orderId}
              </div>
              <div>
                <strong>Name:</strong> {orderDetails.firstName} {orderDetails.lastName}
              </div>
              <div>
                <strong>Email:</strong> {orderDetails.email}
              </div>
              <div>
                <strong>Phone:</strong> {orderDetails.phone}
              </div>
              <div>
                <strong>Address:</strong> {orderDetails.address}, {orderDetails.city}, {orderDetails.province}, {orderDetails.country} - {orderDetails.zip}
              </div>
              <div>
                <strong>Total Amount:</strong> Rs. {totalAmount}
              </div>
              <div>
                <strong>Additional Info:</strong> {orderDetails.additionalInfo || "N/A"}
              </div>
              <button
                onClick={handleCloseModal}
                className="mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="md:w-[600px] w-auto sm:h-auto px-10 py-28 gap-10">
          <div className="bg-[#F9F1E7] py-8 px-11 sm:p-8 rounded-sm shadow-lg w-full mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-8">Your Cart</h2>
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={`Product image of ${item.title}`}
                          width={50}
                          height={50}
                          className="rounded-md"
                        />
                      )}
                      <span>{item.title}</span>
                    </div>
                    <span>Rs. {item.price}</span>
                    <span>Qty: {item.quantity}</span>
                    <span>Rs. {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">Your cart is empty.</p>
            )}
          </div>

          <div className="bg-[#F9F1E7] py-8 px-11 sm:p-8 rounded-sm shadow-lg w-full mx-auto mt-8">
            <h2 className="text-3xl font-semibold text-center mb-8">Cart Totals</h2>
            <div className="flex justify-between mb-5">
              <span className="text-base font-semibold">Subtotal</span>
              <span className="text-base text-[#9F9F9F]">Rs. {totalAmount}</span>
            </div>
            <div className="flex justify-between font-medium mb-5">
              <span className="text-base font-semibold">Total</span>
              <span className="text-xl text-[#B88E2F] font-semibold">
                Rs. {totalAmount}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-5 mt-10">
            <span className="flex gap-2 items-center">
              <span className="w-[14px] h-[14px] rounded-full bg-black"></span>
              <p className="font-poppins font-normal text-base">Direct Bank Transfer</p>
            </span>
            <p className="font-poppins font-light text-base text-[#9F9F9F]">
              Make your payment directly into our bank account. Please use your Order ID
              as the payment reference. Your order will not be shipped until the funds
              have cleared in our account.
            </p>
            <div>
              <label
                className="text-base font-poppins font-medium text-[#9F9F9F]"
                htmlFor="dbt"
              >
                <input
                  type="radio"
                  className="mr-2"
                  id="dbt"
                  name="payment-method"
                />
                Direct Bank Transfer
              </label>
              <br />
              <label
                className="text-base font-poppins font-medium text-[#9F9F9F]"
                htmlFor="cash-on-delivery"
              >
                <input
                  type="radio"
                  className="mr-2"
                  id="cash-on-delivery"
                  name="payment-method"
                />
                Cash on Delivery
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
