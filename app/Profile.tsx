import Image from "next/image";
import RichText from "./RichText";
import Arrow12 from "./Arrow12";
import styles from "./Profile.module.css";
import Attachments from "./Attachments";

type ProfileProps = {
  cv: any,
};
const Profile: React.FC<ProfileProps> = ({
  cv
}) => {
  return (
    <div className={styles.profile}>
      <div className={styles.profileHeader}>
        <div className={styles.profilePhoto}>
          <Image src={cv.general.profilePhoto} alt="" width={92} height={92} />
        </div>
        <div className={styles.profileInfo}>
          <h1>{cv.general.displayName}</h1>
          <div className={styles.byline}>{cv.general.byline}</div>
          {cv.general.website ?
            <a className={styles.website}>{cv.general.website}</a>
          : null}
        </div>
      </div>

      {cv.general.about ?
        <section className={`${styles.profileSection} ${styles.about}`}>
          <h3>About</h3>
          <div className={styles.description}>
            <RichText text={cv.general.about}/>
          </div>
        </section>
      : null}

      {cv.allCollections.map((collection: any, index: number) => {
        return (
          <section className={styles.profileSection}>
            <h3>{collection.name}</h3>
            <div className={collection.name === "Contact" ? styles.contacts : styles.experiences}>
              {collection.items.map((experience: any, index: number) => {

                if (collection.name === "Contact") {
                  return <ContactItem key={experience.url} experience={experience}/>
                }

                return (
                  <ProfileItem key={experience.heading} experience={experience}/>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  );
};

type ProfileItemProps = {
  experience: any,
};
const ProfileItem: React.FC<ProfileItemProps> = ({
  experience
}) => {

  let title;
  if (experience.url) {
    title = <>
      <a href={experience.url} target="_blank">{experience.heading}</a><span className={styles.linkArrow}>&#xfeff;<Arrow12 fill="var(--grey1)"/></span>
    </>
  } else {
    title = experience.heading
  }
  return (
    <div className={styles.experience}>
      <div className={styles.year}>
        <span>{experience.year}</span>
      </div>
      <div className={styles.experienceContent}>
        <div className={styles.title}>
          {title}
        </div>
        {experience.location ?
        <div className={styles.location}>{experience.location}</div>
        : null}
        {experience.description ?
        <div className={styles.description}>
          <RichText text={experience.description}/>
        </div>
        : null}
        {experience.attachments && experience.attachments.length > 0 ?
          <Attachments attachments={experience.attachments}/>
        : null}
      </div>
    </div>
  )
}

type ContactItemProps = {
  experience: any,
};
const ContactItem: React.FC<ContactItemProps> = ({
  experience
}) => {
  return (
    <div className={styles.experience}>
      <div className={styles.year}>
        <span>{experience.platform}</span>
      </div>
      <div className={styles.experienceContent}>
        <div className={styles.title}>
          <a href={experience.url} target="_blank">{experience.handle}</a><span className={styles.linkArrow}>&#xfeff;<Arrow12/></span>
        </div>
      </div>
    </div>
  )
}

export default Profile;
