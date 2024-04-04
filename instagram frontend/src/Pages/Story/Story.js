import React from 'react'
import StoryViewer from '../../Components/StoryComponents/StoryViewer'

const Story = () => {

    const story = [
        {
            image : "https://images.pexels.com/photos/18548494/pexels-photo-18548494/free-photo-of-skyscrapers-in-london.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            image : "https://images.pexels.com/photos/13319992/pexels-photo-13319992.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            image : "https://images.pexels.com/photos/13095185/pexels-photo-13095185.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        },
        {
            image : "https://images.pexels.com/photos/18503108/pexels-photo-18503108/free-photo-of-old-europe-bruges-cafe-facade-christmas-street.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        }
    ]

  return (
    <div>
        <StoryViewer stories={story} />
    </div>
  )
}

export default Story