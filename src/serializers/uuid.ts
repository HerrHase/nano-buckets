/**
 *
 *  @param  value
 *  @return
 */

function uuidSerialize(value: string)
{
    // max for id
    value = value.slice(0, 128)

    // only dash, numbers & letters are allowed
    value = value.replace(/[^a-z0-9-]/gi, '')

    return value
}