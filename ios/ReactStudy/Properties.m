//
//  Properties.m
//  ReactStudy
//
//  Created by Rongbin on 16/6/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "Properties.h"
#import <Foundation/Foundation.h>

#define desKey @"xdy.2015"
@interface Properties()
{
  NSString *pkCode;
}
@end

@implementation Properties
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getPkCode:(RCTResponseSenderBlock)callback){
  if (pkCode==nil) {
    pkCode=@"";
  }
  callback(@[[NSNull null], pkCode]);
}

RCT_EXPORT_METHOD(setPkCode:(NSString *)_pkCode){
  pkCode=_pkCode;
}

RCT_EXPORT_METHOD(encryptParameters:(NSDictionary *)parames callback:(RCTResponseSenderBlock)callback)
{
  callback(@[[NSNull null], [self encryptParameters:parames]]);
}

RCT_EXPORT_METHOD(decryptUseDES:(NSString *)string callback:(RCTResponseSenderBlock)callback){
  callback(@[[NSNull null],[self decryptUseDES:string key:desKey]]);
}

RCT_EXPORT_METHOD(getDeviceId:(RCTResponseSenderBlock)callback){
  NSLog(@"--------js ");
  callback(@[[NSNull null],[[UIDevice currentDevice] identifierForVendor].UUIDString]);
}

-(NSDictionary *)encryptParameters:(NSDictionary *)parames
{
  NSMutableDictionary *outDic = [NSMutableDictionary dictionary];
  for (id obj in parames) {
    if ([[parames objectForKey:obj] isKindOfClass:[NSDictionary class]]) {
      [outDic setObject:[self encryptParameters:[parames objectForKey:obj]] forKey:obj];
    }else{
      [outDic setObject:[self encryptUseDES:[parames objectForKey:obj] key:desKey] forKey:obj];
    }
  }
  return outDic;
}

-(NSString *) encryptUseDES:(NSString *)plainText key:(NSString *)key
{
  const Byte iv[] = {1,2,3,4,5,6,7,8};
  NSString *ciphertext = nil;
  NSData *textData = [plainText dataUsingEncoding:NSUTF8StringEncoding];
  NSUInteger dataLength = [textData length];
  unsigned char buffer[1024];
  memset(buffer, 0, sizeof(char));
  size_t numBytesEncrypted = 0;
  CCCryptorStatus cryptStatus = CCCrypt(kCCEncrypt, kCCAlgorithmDES,
                                        kCCOptionPKCS7Padding,
                                        [key UTF8String],
                                        kCCKeySizeDES,
                                        iv,
                                        [textData bytes], dataLength,
                                        buffer, 1024,
                                        &numBytesEncrypted);
  if (cryptStatus == kCCSuccess) {
    NSData *data = [NSData dataWithBytes:buffer length:(NSUInteger)numBytesEncrypted];
    //        ciphertext = [Base64 encode:data];
    ciphertext = [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
  }
  return ciphertext;
}

//解密
-(NSDictionary *)decryptUseDES:(NSString *)cipherText key:(NSString *)key
{
  const Byte iv[] = {1,2,3,4,5,6,7,8};
  NSDictionary *plaintext = nil;
  NSData *cipherdata = [[NSData alloc] initWithBase64EncodedString:cipherText options:NSDataBase64DecodingIgnoreUnknownCharacters];
  unsigned char buffer[1024*100];
  memset(buffer, 0, sizeof(char));
  size_t numBytesDecrypted = 0;
  CCCryptorStatus cryptStatus = CCCrypt(kCCDecrypt, kCCAlgorithmDES,
                                        kCCOptionPKCS7Padding,
                                        [key UTF8String], kCCKeySizeDES,
                                        iv,
                                        [cipherdata bytes], [cipherdata length],
                                        buffer, 1024*100,
                                        &numBytesDecrypted);
  if(cryptStatus == kCCSuccess) {
    NSData *plaindata = [NSData dataWithBytes:buffer length:(NSUInteger)numBytesDecrypted];
    plaintext = [NSJSONSerialization JSONObjectWithData:plaindata options:NSJSONReadingMutableLeaves error:nil];
  }
  return plaintext;
}

@end
