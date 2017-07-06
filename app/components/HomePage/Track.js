import React from 'react';
import { Link } from 'react-router';
import { changeAlias } from '../../utils/func';
import Dropdown from '../Dropdown';
import LinksByComma from '../LinksByComma';

class Track extends React.Component {
  render() {
    const {
      name,
      thumbnail,
      order,
      id,
      show,
      dropDownActiveId,
      addSongToQueue,
      toggleTrackDropDown,
      artists,
    } = this.props;

    return (
      <li>
        <div className="trackPosition">
          {order}
        </div>
        <img src={thumbnail} className='track-thumb image-wrapper' />
        <div className="trackDetail">
          <div className="trackTitle">
            <Link to={`song/${changeAlias(name)}/${id}`}>{name}</Link>
          </div>
          <LinksByComma
            className="trackArtist"
            data={artists}
            titleEntry="name"
            pathEntry="link"
            definePath={(link) => link.replace('/nghe-si/', '/artist/')}
            defineTitle={(title) => title.replace('Nhiều nghệ sĩ', 'Various artists')}
          />
        </div>
        <div className="trackActions">
          <div className="hp-track-toolbar">
            <button className='sc-ir'><i className="ion-android-download" title="download the track" /></button>
            <button className='sc-ir'><i className="ion-android-share" title="share" /></button>
            <button
              className='sc-ir ignore-react-onclickoutside'
              onClick={this.props.toggleTrackDropDown.bind(null, id)}>
              <i className="ion-more" />
            </button>
          </div>
        </div>
        { show && id === dropDownActiveId &&
          <Dropdown
            name={name}
            id={id}
            thumbnail={thumbnail}
            addSongToQueue={addSongToQueue}
            toggleTrackDropDown={toggleTrackDropDown}
          />
        }
      </li>
    );
  }
}

export default Track;