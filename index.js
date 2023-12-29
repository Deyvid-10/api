// Usar libreria express y cors
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de la solicitud como JSON y para dar permisos
app.use(express.json())
app.use(cors());

// Configuración de la conexión a la base de datos
const conexion = mysql.createConnection({
    host: '34.123.5.190',
    user: 'root',
    password: 'America10',
    database: 'esccuela'  
});

// Conectar la base de datos
conexion.connect(error => {
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Rutas para obtener todos los datos
app.get('/escuela/:id', (pedido, respuesta) => {
    
  conexion.query(`SELECT * FROM estudiantes WHERE id = ${pedido.params.id}`, (error, resultado) => {
    if (error) throw error
    respuesta.send(resultado)
  });
});

app.get('/escuela', (pedido, respuesta) => {
    
    conexion.query('SELECT * FROM estudiantes', (error, resultado) => {
      if (error) throw error
      respuesta.send(resultado)
    });
  });

// Ruta para agregar estuantes

app.post('/escuela', (pedido, respuesta) => {
    
  conexion.query(`INSERT INTO estudiantes SET ?`, pedido.body, (error, resultado) => {
    if (error) throw error
    respuesta.send("Estudiante registrado")
  })

});

// Ruta para actulizar notas
app.put("/escuela/:id", (pedido, respuesta) => {
    
  conexion.query(`UPDATE estudiantes SET ? WHERE id = ?`, [pedido.body, pedido.params.id], (error, resultado) => {
    if (error) throw error
    respuesta.send("Datos actualizados correctamente")
  })

})

// Ruta para eliminar datos

app.delete('/escuela/:id', (pedido, respuesta) => {
  
  conexion.query('DELETE FROM estudiantes WHERE id = ' + pedido.params.id, (error, resultado) => {
    if (error) throw error
    respuesta.send(`Se elimino la nota con el id ${pedido.params.id} `)
  });
});


// Escuchar en el puerto especificado
app.listen(port, () => {
});


