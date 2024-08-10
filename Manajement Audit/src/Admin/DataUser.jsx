import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DataKaryawan from './DataKaryawan'; // Impor komponen DataKaryawan

Modal.setAppElement('#root');

const DataUser = () => {
  const [orders, setOrders] = useState([]);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isKaryawanModalOpen, setIsKaryawanModalOpen] = useState(false);
  const [selectedKaryawan, setSelectedKaryawan] = useState(null);
  const [newUser, setNewUser] = useState({
    NIK: '',
    Name: '',
    Role: '',
    Organization: '',
    Email: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:3100/Admin/add-karyawan');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setOrders(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await fetch('http://localhost:3100/Admin/add-karyawan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const result = await response.json();
      setOrders((prev) => [
        ...prev,
        { no: result.no, ...newUser },
      ]);
      setIsAddUserModalOpen(false);
      setNewUser({ NIK: '', Name: '', Role: '', Organization: '', Email: '' });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setIsAddUserModalOpen(true);
  };

  const handleDeleteUser = async (user) => {
    try {
      const response = await fetch(`http://localhost:3100/Admin/add-karyawan/${user.no}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setOrders((prev) => prev.filter((order) => order.no !== user.no));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const openKaryawanModal = () => {
    setIsKaryawanModalOpen(true);
  };

  const handleKaryawanSelect = (karyawan) => {
    setNewUser({
      ...newUser,
      NIK: karyawan.NIK,
      Name: karyawan.Nama,
      Organization: karyawan.Organisasi,
      Email: karyawan.Email,
    });
    setIsKaryawanModalOpen(false);
  };

  return (
    <div className="data-user">
      <h2>Data User</h2>
      <div className="AddUser">
        <button
          className="add-user-button"
          onClick={() => setIsAddUserModalOpen(true)}
        >
          Add User
        </button>
      </div>
      <div className="data-user-content">
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>NIP</th>
              <th>Name</th>
              <th>Role</th>
              <th>Organization</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.no}>
                <td>{order.no}</td>
                <td>{order.NIP}</td>
                <td>{order.Name}</td>
                <td>{order.Role}</td>
                <td>{order.Organization}</td>
                <td>{order.Email}</td>
                <td>
                  <button onClick={() => handleDeleteUser(order)}>Delete</button>
                  <button onClick={() => handleEditUser(order)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add User Modal */}
      <Modal
        isOpen={isAddUserModalOpen}
        onRequestClose={() => setIsAddUserModalOpen(false)}
        contentLabel="Add User Modal"
        className="user-modal"
        overlayClassName="user-modal-overlay"
      >
        <h3>Add Data User</h3>
        <div className="modal-content">
          <label>NIK</label>
          <input
            type="text"
            name="NIK"
            value={newUser.NIK}
            onClick={openKaryawanModal}
            readOnly
            className="modal-input"
          />
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={newUser.Name}
            onChange={handleInputChange}
            className="modal-input"
          />
          <label>Role</label>
          <select
            name="Role"
            value={newUser.Role}
            onChange={handleInputChange}
            className="modal-select"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="SPI">SPI</option>
            <option value="AUDITEE">Auditee</option>
            <option value="AUDITOR">Auditor</option>
            <option value="ADMIN_IT">Admin IT</option>
          </select>
          <label>Organization</label>
          <input
            type="text"
            name="Organization"
            value={newUser.Organization}
            onChange={handleInputChange}
            className="modal-input"
          />
          <label>Email</label>
          <input
            type="email"
            name="Email"
            value={newUser.Email}
            onChange={handleInputChange}
            className="modal-input"
          />
        </div>
        <div className="modal-actions">
          <button onClick={() => setIsAddUserModalOpen(false)} className="modal-cancel">Cancel</button>
          <button onClick={handleAddUser} className="modal-add">Add</button>
        </div>
      </Modal>

      {/* Data Karyawan Modal */}
      <Modal
        isOpen={isKaryawanModalOpen}
        onRequestClose={() => setIsKaryawanModalOpen(false)}
        contentLabel="Data Karyawan Modal"
        className="karyawan-modal"
        overlayClassName="karyawan-modal-overlay"
      >
        <h3>Data Karyawan</h3>
        <DataKaryawan onSelectKaryawan={handleKaryawanSelect} />
        <button onClick={() => setIsKaryawanModalOpen(false)} className="modal-cancel">Close</button>
      </Modal>
    </div>
  );
};

export default DataUser;
