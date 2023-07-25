import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function Modal({ content }) {
  const [open, setOpen] = useState(true)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        {/* rest of the modal code */}
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Latest Message
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {content}
                    </p>
                  </div>
                </div>
        {/* rest of the modal code */}
      </Dialog>
    </Transition.Root>
  )
}
