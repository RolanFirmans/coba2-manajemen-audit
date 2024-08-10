import React, { useState, useEffect } from 'react';

const DataKaryawan = ({ onSelectKaryawan }) => {
  const [dataKaryawan, setDataKaryawan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3100/Data/');
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setDataKaryawan(result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>NIK</th>
            <th>Nama</th>
            <th>Organisasi</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {dataKaryawan.length === 0 ? (
            <tr>
              <td colSpan="4">No data available</td>
            </tr>
          ) : (
            dataKaryawan.map((karyawan, index) => (
              <tr
                key={index}
                onClick={() => onSelectKaryawan(karyawan)} // Call onSelectKaryawan with the selected karyawan
                style={{ cursor: 'pointer' }}
              >
                <td>{karyawan.nik}</td>
                <td>{karyawan.nama}</td>
                <td>{karyawan.organisasi}</td>
                <td>{karyawan.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataKaryawan;
