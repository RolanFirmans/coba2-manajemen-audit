const pool = require('../utils/MAudit');

module.exports = (req, res) => {
    pool.query(
        `
        SELECT nik, nama, organisasi, email FROM data_karyawan
        ORDER BY nik
        `,
        [],
        (dbError, dbResponse) => {
            if (dbError) throw dbError;

            res.json(dbResponse.rows);
        }
    );
};
