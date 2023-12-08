import React, { useState, useEffect } from "react";
import { DataStore, Predicates } from "aws-amplify";
import { CafeOrder } from "../models";
import { format, parse } from "date-fns";
import { CheckCircleIcon } from "@heroicons/react/20/solid";



export default function App() {
    //get all orders with false completed status
    const [orders, setOrders] = useState([]);
    console.log(orders);
  
    useEffect(() => {
      fetchTodaysOrders();
      const subscription = DataStore.observe(CafeOrder).subscribe(() =>
        fetchTodaysOrders()
      );
      return () => subscription.unsubscribe();
    }, []);
  
    async function fetchTodaysOrders() {
      const allOrders = await DataStore.query(CafeOrder, Predicates.ALL, {
        sort: (s) => s.CreatedTime("asc"),
      });
      const orders = allOrders.filter((order) => order.Completed === false);
      setOrders(orders);
    }
  
    return (
      <div className="flex space-x-12">
        {orders.map((order) => (
          <OrderProgress key={order.id} order={order} />
        ))}
      </div>
    );
  }
  
  function OrderProgress({ order }) {
    // Map through the orders array and create a new step for each order
    const steps = [
      {
        name: "Order Taken",
        description: "Table:" + order.Table,
        href: "/kitchen",
        status: "complete",
      },
      {
        name: "Preparation",
        description: format(new Date(), "h:mm:ss a"),
        href: "#",
        status: "current",
      },
      {
        name: "Completed",
        description: format(new Date(), "h:mm:ss a"),
        href: "#",
        status: order.Completed ? "complete" : "upcoming",
      },
    ];
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
        }
  
    return (
            <nav aria-label="Progress">
<ol role="list" className="overflow-hidden bg-white bg-opacity-75 backdrop-blur-md">
                {steps.map((step, stepIdx) => (
                  <li
                    key={step.name}
                    className={classNames(
                      stepIdx !== steps.length - 1 ? "pb-10" : "",
                      "relative"
                    )}
                  >
                    {step.status === "complete" ? (
                      <>
                        {stepIdx !== steps.length - 1 ? (
                          <div
                            className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-indigo-600"
                            aria-hidden="true"
                          />
                        ) : null}
                        <a href={step.href} className="group relative flex items-start">
                          <span className="flex h-9 items-center">
                            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                              <CheckCircleIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                              />
                            </span>
                          </span>
                          <span className="ml-4 flex min-w-0 flex-col">
                            <span className="text-sm font-medium">{step.name}</span>
                            <span className="text-sm text-gray-500">
                              {step.description}
                            </span>
                          </span>
                        </a>
                      </>
                    ) : step.status === "current" ? (
                      <>
                        {stepIdx !== steps.length - 1 ? (
                          <div
                            className="absolute left-4 top-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300"
                            aria-hidden="true"
                          />
                        ) : null}
                        <a
                          href={step.href}
                          className="group relative flex items-start"
                          aria-current="step"
                        >
                          <span className="flex h-9 items-center" aria-hidden="true">
                            <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-indigo-600 bg-white">
                              <svg
                                className="animate-spin h-5 w-5 text-indigo-600"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                ></circle>
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                              </svg>
                            </span>
                          </span>
                          <span className="ml-4 flex min-w-0 flex-col">
                            <span className="text-sm font-medium text-indigo-600">
                              {step.name}
                            </span>
                            <span className="text-sm text-gray-500">
                              {step.description}
                            </span>
                          </span>
                        </a>
                      </>
                    ) : (
                      <>
                        {stepIdx !== steps.length - 1 ? (
                          <div
                            className="absolute left-4 top-4 -ml-p
                            x mt-0.5 h-full w-0.5 bg-gray-300"
                            aria-hidden="true"
                            />
                            ) : null}
                            <a href={step.href} className="group relative flex items-start">
                              <span className="flex h-9 items-center" aria-hidden="true">
                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400">
                                  <span className="h-2.5 w-2.5 rounded-full bg-transparent group-hover:bg-gray-300" />
                                </span>
                              </span>
                              <span className="ml-4 flex min-w-0 flex-col">
                                <span className="text-sm font-medium text-gray-500">
                                  {step.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {step.description}
                                </span>
                              </span>
                            </a>
                          </>
                        )}
                      </li>
                    ))}
                  </ol>
                </nav>
              );
            }
