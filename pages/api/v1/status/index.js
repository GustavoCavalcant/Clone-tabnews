function status(request, response) {
  response.status(200).json({ chave: "validação" });
}

export default status;
