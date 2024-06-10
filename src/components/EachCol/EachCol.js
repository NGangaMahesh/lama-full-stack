import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';
import { StoreContext } from '../../context/StoreContext'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const EachCol = (props) => {
    const { url, token } = useContext(StoreContext)
    const { eachepi } = props
    const { name, status, timestamp, _id, transcript } = eachepi
    const [transcripttext, setTranscript] = useState("");

    const [basicModal, setBasicModal] = useState(false)
    const { id } = useParams();

    const deleteEpi = async () => {
        try {
            console.log(id);
            const response = await axios.delete(`${url}/episodes/delete?projectId=${id}`, {
                headers: { token },
                data: { episodeId: _id } // Include episodeId in the data field
            });
            console.log(response);
            // Handle the response as needed
        } catch (error) {
            console.error('Error deleting episode:', error);
            // Handle the error as needed
        }
    };

    return (
        <tr>
            <td><p>{name}</p></td>
            <td>{timestamp}</td>
            <td><p>{status}</p></td>
            <td>
                <MDBBtn color='link' rounded size='sm' onClick={() => setBasicModal(true)}>Edit</MDBBtn>
                <MDBBtn onClick={deleteEpi} color='danger' rounded size='sm'>Delete</MDBBtn>
            </td>
            <MDBModal open={basicModal} onClose={() => setBasicModal(false)} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Transcript details</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={() => setBasicModal(false)}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <input
                                type="text"
                                className="form-control"
                                value={transcripttext}
                                onChange={(e) => setTranscript(e.target.value)}
                                placeholder={transcript === "" ? "No transcript available" : ""}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={() => setBasicModal(false)}>
                                Close
                            </MDBBtn>
                            <MDBBtn>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </tr>
    )
}

export default EachCol
