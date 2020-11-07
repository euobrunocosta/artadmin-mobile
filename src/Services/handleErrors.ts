const handleErrors = (error: any) => {
  console.error(error)
  const message =
    error.response?.data?.messages?.[0] ?? "Something is wrong!"
  console.error(message)
}

export default handleErrors