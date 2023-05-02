import { useAppSelector } from "../../app/hooks"

const PersonalStatement = () => {
  const { isDarkMode } = useAppSelector((state) => state.global)

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
            meaning? Without being genuine to yourself you are unable to be
            genuine to anyone else.
          </p>
          <div className="flex flex-col gap-8 900:gap-12">
            <p
              className="text-left text-xl 900:text-2xl leading-10 900:leading-10"
              data-aos="fade-down"
              data-aos-delay="200"
              data-aos-anchor="#personal-statement"
            >
              Love yourself. You’re the only person in this life that will be
              with you no matter what. Take care of yourself, respect yourself,
              better yourself. Learn to be on your own and be happy with
              yourself. You’re deserving of everything you want out of life, and
              anyone who gets in the way of that is not worth keeping around.
            </p>
            <p
              className="text-left text-xl 900:text-2xl leading-10 900:leading-10"
              data-aos="fade-down"
              data-aos-delay="400"
              data-aos-anchor="#personal-statement"
            >
              Remember that while attaining absolute perfection will never
              happen, striving to get as close to it as possible, to reach the
              highest heights you could possibly go will always be worth the
              effort. Always look to kaizen for inspiration and guidance, the
              Japanese philosophy of changing for the better and continuous
              improvement. Seek to be better than your previous self every
              single day, even if in the most minuscule of ways, even if only by
              1%. Continuous growth does not always occur upward. There will be
              periods of lows and setbacks, but as long as you’re improving in
              the long run, consider your growth a success. Stop comparing
              yourself to others.
            </p>
            <p
              className="text-left text-xl 900:text-2xl leading-10 900:leading-10"
              data-aos="fade-down"
              data-aos-delay="600"
              data-aos-anchor="#personal-statement"
            >
              Never stop learning, and never close yourself off in terms of
              personal growth. Stay true to your convictions, but be receptive
              to personal change and always keep an open mind. Truly love and
              serve those closest to you. Live each day in line with the ideal
              person you envision yourself to be.
            </p>
            <p
              className="text-left text-xl 900:text-2xl leading-10 900:leading-10"
              data-aos="fade-down"
              data-aos-delay="800"
              data-aos-anchor="#personal-statement"
            >
              Remember that the feelings of sadness and emptiness will not last
              forever. Be grateful for all the blessings in your life and do
              your best to remain positive, no matter the situation or
              environment. On that same note, realize that much of life is
              suffering and misery, and that’s okay. Learn to be okay with being
              sad. Try your best to let your mind be at ease when dealing with
              anxiety. Believe that everything will be okay.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PersonalStatement
