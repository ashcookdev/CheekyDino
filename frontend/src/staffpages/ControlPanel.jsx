
import { useEffect, useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

export default function ControlPanel() {
  const [open, setOpen] = useState(true);



  const Navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      Navigate("/dashboard");
    }
  }, [open, Navigate]);

  const isElectron = window && window.process && window.process.type;
  const ipcRenderer = isElectron ? window.require('electron').ipcRenderer : null;

  const handleClick1 = () => {
    console.log("Button 1 clicked");
    ipcRenderer.send("open-drawer");
  };

  const handleClick2 = () => {
    console.log("Button 2 clicked");
    ipcRenderer.send("cafe-drawer");
  };

  const handleClick3 = () => {
    console.log("Button 3 clicked");
    ipcRenderer.send("entrance");
  };

  const handleClick4 = () => {
    console.log("Button 4 clicked");
    ipcRenderer.send("exit");
  };

  const handleClick5 = () => {
    console.log("Button 5 clicked");
    ipcRenderer.send("closing");
  };

  const handleServer = () => {
    console.log("Server Restarted");
    ipcRenderer.send("restart-server");
  }



  




  

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black"  />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden bg-contain bg-center bg-gradient-to-t from-indigo-700 via-sky-300 to-purple-600">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
<Dialog.Panel className="pointer-events-auto w-screen max-w-xs">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
Controls                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
  <div className="flex flex-col items-center justify-center h-screen">
    <div className="flex flex-row justify-center">
      <motion.button
        className="w-20 h-20 bg-indigo-500 text-white m-2 border-2 border-indigo-700 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick1}
      >
        Till Drawer (Front)
      </motion.button>
      <motion.button
        className="w-20 h-20 bg-green-500 text-white m-2  border-2 border-green-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick2}
      >
        Till Drawer (Cafe)
      </motion.button>
    </div>
    <div className="flex flex-row justify-center">
      <motion.button
        className="w-20 h-20 bg-purple-500 text-white m-2  border-2 border-purple-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick3}
      >
        Front Gate (Entry)
      </motion.button>
      <motion.button
        className="w-20 h-20 bg-blue-500 text-white m-2  border-2 border-blue-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick4}
      >
        Front Gate (Exit)
      </motion.button>
    </div>
    <div className="flex flex-row justify-center">
      <motion.button
        className="w-20 h-20 bg-red-500 text-white m-2  border-2 border-red-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick5}
      >
        Both Gates
      </motion.button>
      <motion.button
        className="w-20 h-20 bg-gray-500 text-white m-2  border-2 border-gray-700"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleServer}
      >
        Restart Server
      </motion.button>

    </div>
  </div>
</div>
</div>

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
