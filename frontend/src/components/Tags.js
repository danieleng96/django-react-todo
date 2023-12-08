import './Tags.css';
import { useState } from 'react';



const Tags = ({editMode, handleTag}) => {

    const tagText = 
    [
    {'name':'easy','text':'易'},
    {'name':'medium','text':'中'},
    {'name':'hard','text':'難'}
    ]

    const [selectedTag, setSelectedTag] = useState(null);

    const handleSelectTag = (tagName) => {
        setSelectedTag(tagName);
    }
    console.log("edit",editMode)

    return (
        editMode ? (
            <div className={'tag-wrapper edit'}>
            {tagText.map((tag) => (
              <div
                key={tag.name}
                className={`tag ${tag.name} ${selectedTag === tag.name ? 'selected' : 'deselected'}`}
                onClick={() => {
                  handleSelectTag(tag.name);
                  handleTag(tag.name); // Call the handleTag function to update the tag value
                }}
              >
                {tag.text}
              </div>
            ))}
          </div>
        ) : (
        <div className={'tag-wrapper display'}>
            {tagText.map((tag) =>
            selectedTag === tag.name && (
                <div
                key={tag.name}
                className={`tag ${tag.name} selected`}
                >
                {tag.text}
                </div>
            )
            )}
        </div>
        )
    );
    }

export default Tags;
