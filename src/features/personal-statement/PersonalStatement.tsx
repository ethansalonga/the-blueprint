import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchStatement } from "./statementSlice"
import UpdateStatementModal from "./modals/UpdateStatementModal"
import Spinner from "../../assets/Spinner"
import { PencilIcon } from "@heroicons/react/24/solid"

const PersonalStatement = () => {
  const effectRan = useRef(false)
  const dispatch = useAppDispatch()

  const { isDarkMode } = useAppSelector((state) => state.global)
  const { currentUser } = useAppSelector((state) => state.auth)
  const { personalStatement, fetchStatementStatus, fetchStatementError } =
    useAppSelector((state) => state.statement)

  const [isUpdateStatementModalOpen, setIsUpdateStatementModalOpen] =
    useState(false)

  useEffect(() => {
    if (effectRan.current === false) {
      if (currentUser) {
        dispatch(fetchStatement(currentUser.uid))
      }

      return () => {
        effectRan.current = true
      }
    }
  }, [personalStatement, dispatch, currentUser])

  return (
    <section
      id="personal-statement"
      className={isDarkMode ? "bg-161616" : "bg-824936"}
    >
      <div className="row">
        <div className="container text-white">
          <h3 className="sectionTitle text-f3eed9" data-aos="fade-down">
            Personal Statement
          </h3>
          <p className="sectionDesc after:bg-f3eed9" data-aos="fade-down">
            What would you say if you were to give yourself your most profound
            advice? What words would be most important for you to remember
            throughout your entire life? What drives you, gives your life
            meaning? Without being genuine with yourself you are unable to be
            genuine with anyone else.
          </p>
          <div className="flex flex-col items-center gap-8">
            {fetchStatementStatus === "loading" && (
              <Spinner className="mt-8 h-24 w-24 fill-f3eed9" />
            )}
            {fetchStatementStatus === "succeeded" && (
              <>
                <button
                  className={`${
                    isDarkMode ? "plus-icon--dark" : "plus-icon text-f3eed9"
                  }`}
                  onClick={() => setIsUpdateStatementModalOpen(true)}
                >
                  <PencilIcon
                    data-aos="fade-down"
                    data-aos-delay="200"
                    data-aos-anchor="#personal-statement"
                  />
                </button>
                <p
                  className="text-left text-xl 900:text-2xl leading-10 900:leading-10"
                  data-aos="fade-down"
                  data-aos-delay="200"
                  data-aos-anchor="#personal-statement"
                >
                  {personalStatement.statement}
                </p>
              </>
            )}
            {fetchStatementStatus === "failed" && <p>{fetchStatementError}</p>}
          </div>
        </div>
      </div>
      <UpdateStatementModal
        isOpen={isUpdateStatementModalOpen}
        setIsOpen={setIsUpdateStatementModalOpen}
        personalStatement={personalStatement}
      />
    </section>
  )
}

export default PersonalStatement
