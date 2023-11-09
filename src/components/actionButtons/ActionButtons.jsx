import Link from 'next/link'
import classes from './actionButtons.module.css'
import React from 'react'

const ActionButtons = ({
    isOwnProfile,
    id,
    isFollowed,
    handleFollow
}) => {
    return (
        <div className={classes.buttonContainer}>
            {
                isOwnProfile
                    ? <Link href={`/edit/${id}`}>
                        Edit
                    </Link>
                    : (isFollowed
                        ? <button onClick={handleFollow}>
                            Unfollow
                        </button>
                        : <button onClick={handleFollow}>
                            Follow
                        </button>
                    )
            }
        </div>
    )
}

export default ActionButtons