import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import './Projects.css'
import { MDBBtn, MDBModal, MDBModalBody, MDBModalContent, MDBModalDialog, MDBModalFooter, MDBModalHeader, MDBModalTitle, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'
import DisplayLoading from '../../components/DisplayLoading/DisplayLoading'
import DisplayError from '../../components/DisplayError/DisplayError'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import EachCol from '../../components/EachCol/EachCol'

const apiStatusConstants = {
    initial: 'INITIAL',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS',
    empty: 'EMPTY'
}

const Projects = () => {
    const {url, token} = useContext(StoreContext)
    const [currentStatus, setCurrentStatus] = useState(apiStatusConstants.initial)
    const [centredModal, setCentredModal] = useState(false)
    const [episodeName, setEpisodeName] = useState('')
    const [episodeLink, setEpisodeLink] = useState('')
    const [showError, setShowError] = useState(false)
    const { id } = useParams();

    const [data, setData] = useState([])

    const createEpisode = async() => {
        if (episodeName === '' || episodeLink === '') {
            setShowError(true)
        }
        try{
            await axios.post(`${url}/episodes/add?projectId=${id}`, {name: episodeName, link: episodeLink}, {headers: {token}})
            fetchEpisodes()
            setCentredModal(false)
        }catch(e){
            setShowError(true)
        }
    }

    const handleClick = () => {
        setCentredModal(true);
    };

    const fetchEpisodes = async () => {
        setCurrentStatus(apiStatusConstants.inProgress);
        try {
            const response = await axios.get(`${url}/episodes/get?projectId=${id}`, {
                headers: { token }
            });
    
            if (response.data.length){
                setCurrentStatus(apiStatusConstants.empty)
            }
            setData(response.data.episodes);
            // Set the current status to success
            setCurrentStatus(apiStatusConstants.success);
        } catch (error) {
            // Log the error for debugging
            console.error('Error fetching episodes:', error);
    
            // Handle the error by setting the current status to failure
            setCurrentStatus(apiStatusConstants.failure);
        }
    };
    

    const popupDisplay = () => (
        <MDBModal tabIndex='-1' open={centredModal} onClose={() => setCentredModal(false)}>
            <MDBModalDialog centered>
            <MDBModalContent>
                <MDBModalHeader>
                <MDBModalTitle>Create Project</MDBModalTitle>
                <MDBBtn className='btn-close' color='none' onClick={()=> setCentredModal(!centredModal)}></MDBBtn>
                </MDBModalHeader>
                <MDBModalBody>
                    <div className='popup-body'>
                        <label htmlFor='popup'>Name</label>
                        <input id='popup' className='popup-input' placeholder='Type here' type='text' onChange={(e)=>setEpisodeName(e.target.value)}/>

                        <label htmlFor='popup'>Link</label>
                        <input id='popup' className='popup-input' placeholder='Type here' type='text' onChange={(e)=>setEpisodeLink(e.target.value)}/>
                        {showError && <p>Both name and link are required</p>}
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn style={{ backgroundColor: 'transparent', color: 'red'}} onClick={()=> setCentredModal(!centredModal)}>
                    Cancel
                </MDBBtn>
                <MDBBtn style={{ backgroundColor: '#7E22CE'}} onClick={createEpisode}>Upload</MDBBtn>
                </MDBModalFooter>
            </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    )

    const displayEpisodes  = () => (
        <MDBTable align='middle'>
            <MDBTableHead>
                <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Upload Date & Time</th>
                <th scope='col'>Status</th>
                <th scope='col'>Actions</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {Array.isArray(data) && data.map((eachepi) => (
                    <EachCol key={eachepi._id} eachepi={eachepi}/>
                ))}
            </MDBTableBody>
        </MDBTable>
    )

    const checkCurrentStatus = () => {
        switch (currentStatus){
            case apiStatusConstants.initial:
                return <h1>Initial</h1>
            case apiStatusConstants.inProgress:
                return <DisplayLoading />;
            case apiStatusConstants.failure:
                return <DisplayError />
            case apiStatusConstants.success:
                return displayEpisodes();
            case apiStatusConstants.empty:
                return <p>empty</p>
            default:
                return null;
        }
    }

    useEffect(() => {
        if (token) {
          fetchEpisodes();
        }
        else{
            
        }
      }, [token])

  return (
    <div className='project-main-container'>
      <nav className='Projects-nav'>
        <p className='tab-url'><svg width="44" height="44" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.0002 13.4116L36.8335 23.1616V40.0833H32.5002V27.0833H19.5002V40.0833H15.1668V23.1616L26.0002 13.4116ZM26.0002 7.58325L4.3335 27.0833H10.8335V44.4166H23.8335V31.4166H28.1668V44.4166H41.1668V27.0833H47.6668L26.0002 7.58325Z" fill="#7E22CE"/>
            </svg> / Sample Project / <span className='tab-upload'>Upload</span>
        </p>

        <svg width="54" height="54" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32.0001 58C34.9334 58 37.3334 55.6 37.3334 52.6667H26.6667C26.6667 55.6 29.0667 58 32.0001 58ZM48.0001 42V28.6667C48.0001 20.48 43.6534 13.6267 36.0001 11.8133V10C36.0001 7.78667 34.2134 6 32.0001 6C29.7867 6 28.0001 7.78667 28.0001 10V11.8133C20.3734 13.6267 16.0001 20.4533 16.0001 28.6667V42L10.6667 47.3333V50H53.3334V47.3333L48.0001 42ZM42.6667 44.6667H21.3334V28.6667C21.3334 22.0533 25.3601 16.6667 32.0001 16.6667C38.6401 16.6667 42.6667 22.0533 42.6667 28.6667V44.6667Z" fill="black"/>
        </svg>
      </nav>
        <div className='project-container'>
            <h2 className='project-text-heading'>Upload</h2>
            <ul>
                <li key='1' className='project-upload-container' onClick={handleClick}>
                    <svg width="84" height="83" viewBox="0 0 84 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M42 82.7077C65.196 82.7077 84 64.1929 84 41.3538C84 18.5147 65.196 0 42 0C18.804 0 0 18.5147 0 41.3538C0 64.1929 18.804 82.7077 42 82.7077Z" fill="#DA0000"/>
                    <path d="M68.824 28.0839C68.5067 26.9074 67.8792 25.8344 67.005 24.9737C66.1308 24.113 65.0411 23.4951 63.8462 23.1827C59.5093 22.0554 42 22.0554 42 22.0554C42 22.0554 24.4844 22.0554 20.1164 23.2072C18.9273 23.5243 17.844 24.1443 16.9756 25.0047C16.1072 25.8651 15.4844 26.9356 15.1698 28.1084C14 32.3969 14 41.3784 14 41.3784C14 41.3784 14 50.3476 15.1698 54.6484C15.4844 55.8212 16.1072 56.8917 16.9756 57.7521C17.844 58.6125 18.9273 59.2325 20.1164 59.5496C24.472 60.7014 42 60.7014 42 60.7014C42 60.7014 59.5093 60.7014 63.8773 59.5496C65.0722 59.2372 66.1619 58.6193 67.0361 57.7586C67.9103 56.8978 68.5378 55.8249 68.8551 54.6484C70.0311 50.3598 70.0311 41.3784 70.0311 41.3784C70.0311 41.3784 70 32.3847 68.824 28.0839ZM36.4 49.6247V33.0831L50.9413 41.3539L36.4 49.6247Z" fill="white"/>
                    </svg>
                    <p>Upload Youtube Video</p>
                </li>

                <li key='2' className='project-upload-container' onClick={handleClick}>
                    <svg width="61" height="61" viewBox="0 0 61 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M30.417 0.143921C24.4409 0.143921 18.599 1.91605 13.63 5.23621C8.66103 8.55637 4.78819 13.2754 2.50123 18.7966C0.214264 24.3179 -0.38411 30.3933 0.781774 36.2546C1.94766 42.1159 4.82544 47.4998 9.05119 51.7256C13.277 55.9513 18.6609 58.8291 24.5222 59.995C30.3835 61.1609 36.4589 60.5625 41.9801 58.2755C47.5013 55.9886 52.2204 52.1157 55.5405 47.1468C58.8607 42.1778 60.6328 36.3359 60.6328 30.3597C60.6328 22.346 57.4494 14.6605 51.7828 8.99393C46.1163 3.32737 38.4307 0.143921 30.417 0.143921ZM44.2939 43.7263C44.0327 44.1524 43.6132 44.4576 43.1274 44.575C42.6416 44.6925 42.1291 44.6127 41.7021 44.353C34.6069 40.0154 25.6765 39.035 15.1569 41.4389C14.6801 41.524 14.1888 41.4224 13.785 41.155C13.3812 40.8875 13.0958 40.4749 12.9881 40.0027C12.8804 39.5305 12.9587 39.0349 13.2066 38.6189C13.4546 38.2028 13.8532 37.8982 14.3198 37.7682C25.8287 35.1361 35.7037 36.2686 43.6672 41.1345C44.0903 41.3986 44.3918 41.8194 44.5058 42.3049C44.6199 42.7905 44.5372 43.3014 44.276 43.7263H44.2939ZM47.9914 35.4942C47.6645 36.0268 47.1397 36.408 46.5321 36.554C45.9244 36.7 45.2837 36.599 44.7505 36.2731C36.6303 31.2819 24.2485 29.836 14.6421 32.7501C14.0443 32.9318 13.3989 32.8685 12.8478 32.5743C12.2967 32.2801 11.885 31.7789 11.7033 31.1812C11.5217 30.5834 11.585 29.938 11.8792 29.3868C12.1734 28.8357 12.6746 28.424 13.2723 28.2424C24.244 24.9119 37.8926 26.5279 47.2125 32.2712C47.7391 32.5992 48.1146 33.1221 48.2572 33.7259C48.3997 34.3297 48.2978 34.9653 47.9735 35.4942H47.9914ZM48.3092 26.9308C38.5507 21.1428 22.4848 20.6146 13.1828 23.4347C12.8266 23.5423 12.4526 23.5787 12.0823 23.5417C11.712 23.5048 11.3527 23.3953 11.0247 23.2194C10.3623 22.8643 9.86817 22.2607 9.6509 21.5412C9.54333 21.185 9.50697 20.811 9.54391 20.4407C9.58085 20.0704 9.69036 19.7111 9.86619 19.3831C10.042 19.0551 10.2807 18.765 10.5687 18.5293C10.8566 18.2936 11.1882 18.1169 11.5444 18.0093C22.2207 14.7684 39.9607 15.3951 51.1742 22.0381C51.4934 22.2274 51.7722 22.4777 51.9946 22.7747C52.2171 23.0717 52.3789 23.4097 52.4707 23.7692C52.5626 24.1288 52.5827 24.5029 52.53 24.8703C52.4773 25.2376 52.3527 25.591 52.1634 25.9102C51.9742 26.2294 51.7239 26.5082 51.4268 26.7306C51.1298 26.9531 50.7918 27.1149 50.4323 27.2068C50.0727 27.2986 49.6986 27.3188 49.3313 27.266C48.9639 27.2133 48.6105 27.0888 48.2913 26.8995L48.3092 26.9308Z" fill="#7BD568"/>
                    </svg>
                    <p>Upload Spotify Podcast</p>
                </li>
                
                <li key='3' className='project-upload-container' onClick={handleClick}>
                    <svg width="62" height="61" viewBox="0 0 62 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30.9136" cy="30.6403" r="30.2158" fill="#D9D9D9"/>
                    </svg>

                    <p>Upload Media or Text File</p>
                </li>
            </ul>

            {checkCurrentStatus()}
        </div>
        {popupDisplay()}
    </div>
  )
}

export default Projects
