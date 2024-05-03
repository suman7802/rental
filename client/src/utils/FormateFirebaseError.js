export default function FormatFirebaseError(error) {
  const errorCode = error.split('/')[1];
  return errorCode.replace(/-/g, ' ').replace(/\.$/, '').replace(/\)$/, '');
}
