import React, { memo, useEffect, useState } from "react"
import axios from "../../axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Contacts = ({ setTotalContacts }) => {
  const navigate = useNavigate()

  const [contacts, setContacts] = useState([])
  const [selectedContacts, setSelectedContacts] = useState([])

  const handleSelect = (contactIndex) => {
    if (selectedContacts.includes(contactIndex)) {
      const newSelectedContacts = selectedContacts.filter(
        (contact) => contact !== contactIndex
      )
      setSelectedContacts(newSelectedContacts)
      return
    }
    const newSelectedContacts = [...selectedContacts, contactIndex]
    setSelectedContacts(newSelectedContacts)
  }

  const handleSearch = (e) => {
    const searchQuery = e.target.value
    console.log({ searchQuery })
    const objectKey = "name"
    /* 		const filteredContacts = contacts.filter((contact, index) => {
			const found = contact[objectKey]
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			if (found) {
				return true;
			}
			return false;
		}); */
    // console.log(filteredContacts);

    const updatedContacts = [...contacts]

    updatedContacts.forEach((contact, index) => {
      const found = contact[objectKey]
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
      if (found) {
        contact["show"] = true
      } else {
        contact["show"] = false
      }
    })

    // const filteredContacts = updatedContacts.reduce(
    // 	(acc, contact, index) => {
    // 		const found = contact[objectKey]
    // 			.toLowerCase()
    // 			.includes(searchQuery.toLowerCase());
    // 		if (found) {
    // 			found["found"] = true;
    // 			acc.push(found);
    // 		} else {
    // 			found["show"] = false;
    // 			acc.push(found);
    // 		}
    // 		return acc;
    // 	},
    // 	[]
    // );
    console.log({ updatedContacts })
    setContacts(updatedContacts)
  }

  useEffect(() => {
    console.log("useEffect", document.cookie)
    axios.get("/contacts").then((res) => {
      // setContacts(res.data);
      console.log(res.data)
      if (res.data.success) {
        console.log(res.data.contactList)
        /* const updatedData = res.data.contactList.map((contact) => {
					return {
						...contact,
						show: true,
					};
				}); */
        setContacts(res.data.contactList)
        setTotalContacts(res.data.contactList.length)
      }
    })
  }, [])

  const sendReferLink = async () => {
    const emails = selectedContacts.map((id) => {
      return contacts[id].email
    })
    try {
      const { data } = await axios.post("/send-bulk-email", {
        link: "https://exampmle.com/hello-great-user",
        emails
      })
      console.log(data)
      if (data.success) {
		  toast.success(data.message)
		  navigate("/invite-success")
      }
      toast.error(data.message, {
        icon: "⚠️"
      })
    } catch (error) {
      console.error(error)
      toast.error(error.message)
    }
  }

  return (
    <section className="rounded-2xl border-2">
      <div className="flex justify-between items-center px-4 mt-4">
        <div className="">
          <label htmlFor="">
            <input
              type="checkbox"
              name=""
              id=""
              className="rounded focus:outline-none mr-3"
              checked={selectedContacts.length === contacts.length}
              onChange={() => {
                if (selectedContacts.length === contacts.length) {
                  setSelectedContacts([])
                  return
                }
                const newSelectedContacts = contacts.map(
                  (contact, index) => index
                )
                setSelectedContacts(newSelectedContacts)
              }}
            />
            Deselect All ({selectedContacts.length})
          </label>
        </div>
        <div className="flex items-center w-[70%] gap-x-4">
          <div className="flex-1 hidden max-w-xs ml-auto lg:block">
            <label className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>

              <input
                type="search"
                name=""
                id=""
                className="border block w-full py-2 pl-10 border-gray-300 rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm text-lg"
                placeholder="Search here"
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </div>
          <p>Selected ({selectedContacts.length}) </p>
          <button
            type="submit"
            className="inline-flex  active:scale-95 justify-center text-center rounded-[9.45px]  w-full sm:w-fit hover:scale-[1.02] px-6 py-2 text-lg font-bold text-white transition-all duration-200 bg-gray-900 focus:outline-none focus:bg-gray-600 font-pj "
            onClick={sendReferLink}
          >
            {"Share Link"}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap  items-center mt-4">
        {/**
         * when first time loading the page, the contact object does not have the show property in it
         * when the user searches for a contact, the contact object will have the show property in it
         *  */}
        {contacts.map((contact, index) => {
          if (!("show" in contact)) {
            // if the contact object does not have the show property in it then return the contact component
            return (
              <Contact
                key={index}
                {...contact}
                selectHandler={handleSelect}
                selectedContacts={selectedContacts}
                index={index}
              />
            )
          }

          if ("show" in contact && contact.show) {
            // if the contact object has the show property in it and the value of the show property is true then return the contact component NOTE: this component only work when the user searches for a contact
            return (
              <Contact
                key={index}
                {...contact}
                selectHandler={handleSelect}
                selectedContacts={selectedContacts}
                index={index}
              />
            )
          }
        })}
      </div>
    </section>
  )
}

export default Contacts

const Contact = memo(({ name, email, photo, selectHandler, index }) => {
  return (
    <div className="border relative" style={{ width: "16.66%" }}>
      <input
        type="checkbox"
        className="absolute top-[10px] right-[10px]"
        style={{
          top: "10px",
          right: "10px"
        }}
        onChange={() => selectHandler(index)}
        // checked={selectedContacts.includes(index)}
      />
      <div className="flex flex-col items-center justify-center text-center p-4">
        <div className="rounded-full h-12 w-12 bg-slate-800">
          <img
            src={photo}
            alt=""
            className="w-full h-full rounded-full bg-slate-600"
          />
        </div>
        <h3>{name}</h3>
      </div>
    </div>
  )
})

/**
 * All the Approaches to solve this problem
 * 1. set a property in the each contact object for searching and filtering
 *
 */
